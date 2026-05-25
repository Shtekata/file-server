export const FILES_DIR = process.env.FILES_DIR ?? '/srv/files/FILES_DIR'

export const USER_FILES_DIR = process.env.USER_FILES_DIR ?? '/srv/files/USER_FILES_DIR'

export const PAGE_SIZE = process.env.PAGE_SIZE ? parseInt(process.env.PAGE_SIZE, 10) : 7
