#!/bin/bash
#
# Remove Apple quarantine extended attributes from downloaded files.
#


while getopts ":h" option
do
    case $option in
        h)
            printf "Remove Apple quarantine extended attributes from downloaded files\n"
            printf "usage: %s [-h] [file...]\n" $(basename "$0")
            printf "  -h: print this help\n"
            exit 1
            ;;
        \?)
            printf "Invalid option: -%s\n" "$OPTARG" >&2
            exit 1
            ;;
    esac
done


for attr_name in "com.apple.quarantine" \
                 "com.apple.metadata:kMDItemWhereFroms" \
                 "com.apple.metadata:kMDItemDownloadedDate"
do
    xattr -d "$attr_name" "$@"
done