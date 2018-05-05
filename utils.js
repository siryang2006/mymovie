class Utils {
    static trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    static trimAll(str) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        result = result.replace(/\s/g, "");

        return result;
    }

    /*static Trim(str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");

        return result;
    }*/
};

module.exports = { Utils };