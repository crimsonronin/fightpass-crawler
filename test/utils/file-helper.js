/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import logger from '../../lib/utils/logger';

class FileHelper {
    /**
     * Creates a directory if it doesn't exist.
     *
     * @param dir
     */
    static createDirectory(dir) {
        const normalized = FileHelper.getNormalizedDirectory(dir);
        logger.info(`Creating directory: ${normalized}`);

        if (!fs.existsSync(normalized)) {
            mkdirp.sync(normalized);
        }
    }

    /**
     *
     * @param dir
     */
    static deleteDirectory(dir) {
        const normalized = FileHelper.getNormalizedDirectory(dir);
        logger.info(`Creating directory: ${normalized}`);

        if (fs.existsSync(normalized)) {
            fs.readdirSync(normalized).forEach((file) => {
                var curPath = `${normalized}/${file}`;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileHelper.deleteDirectory(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });

            fs.rmdirSync(dir);
        }
    }

    /**
     *
     * @param file
     */
    static deleteFile(file) {
        if (FileHelper.fileExists(file)) {
            fs.unlinkSync(file);
        }
    }

    /**
     * Checks if the file exists.
     *
     * @param file
     * @return {boolean}
     */
    static fileExists(file) {
        try {
            const stats = fs.lstatSync(file);
            return stats.isFile();
        } catch (err) {
            logger.error(err);
            return false;
        }
    }

    /**
     * Checks if the directory exists.
     *
     * @param dir
     * @returns {boolean}
     */
    static directoryExists(dir) {
        try {
            const stats = fs.lstatSync(dir);
            return stats.isDirectory();
        } catch (err) {
            logger.error(err);
            return false;
        }
    }

    /**
     * Creates a text file from a passed string, filename and directory.
     *
     * @param text
     * @param filename
     * @param dir
     * @returns {string}
     */
    static createTextFile(text, filename, dir) {
        const normalized = FileHelper.getNormalizedDirectory(dir);
        const file = `${normalized}/${filename}.txt`;

        // TODO We probably should standardise the response from these methods
        FileHelper.createDirectory(normalized);
        fs.writeFileSync(file, text);
        return file;
    }

    /**
     * Returns a normalized dir.
     *
     * @param dir
     * @returns {string}
     */
    static getNormalizedDirectory(dir) {
        return path.normalize(dir);
    }

    /**
     * Gets text from a file.
     *
     * @param filepath
     * @returns {string}
     */
    static getTextFile(filepath) {
        return (fs.readFileSync(filepath, 'utf8')).toString('utf-8');
    }

    /**
     * Copy a file.
     *
     * @param from
     * @param to
     */
    static copyFile(from, to) {
        logger.info(`Copying ${from} to ${to}`);
        try {
            fs.writeFileSync(to, fs.readFileSync(from));
            return true;
        } catch (err) {
            logger.error(`Failed to copy the file ${err}`);
            return false;
        }
    }
}

export default FileHelper;
