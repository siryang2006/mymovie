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

	static compare(x, y) {
		if (x < y) {
			return -1;
		} else if (x > y) {
			return 1;
		} else {
			return 0;
		}
	}

	static split(src, separators){
		var indexArray = [0, src.length-1];
		var arrRet = new Array();
		
		var separatorsArray = separators.split("|");
		for(var i=0; i<separatorsArray.length; i++) {
			var index = src.indexOf(separatorsArray[i], 0);
			if(index != -1) {
				indexArray.push(index);
			}
		}

		indexArray = indexArray.sort(this.compare);
		for(var i=1; i<indexArray.length; i++) {
			var str = src.substring(indexArray[i-1], indexArray[i]);
			arrRet.push(str);
		}

		return arrRet;
	}

	static getDataByTagFromArray(arr, tagList, removeTag) {
		var ret = "";
		var tagArray = tagList.split("|");
		for (var i=0; i<arr.length; i++) {
			for (var j=0; j<tagArray.length; j++) {
				var index = arr[i].indexOf(tagArray[j]);
				if(index == 0) {
					if(removeTag == true) {
						ret = arr[i].substring(index+tagArray[j].length, arr[i].length);
					} else {
						ret = arr[i];
					}
					/*console.log("----------,"+ret+"==="+ ret.indexOf('��')+":"+ret.indexOf('��')+":"+"="+(ret.length-1)+"="+"||||");
					if (ret.indexOf("��") == ret.length-1 || ret.indexOf('��') == ret.length-1) {
						//console.log("---------=--------:"+ ret[ret.length-1]+"|||");
						ret = ret.substring(0, ret.length-2);
					}*/
					break;
				}
			}
		}
		return ret;
	}

	static splitData(src, start, end) {
		var arrRet = new Array();
		var arr = src.split(start);
		for(var i=0; i<arr.length; i++) {
			var str = start + arr[i];
			var index = str.indexOf(end);
			if(index != -1) {
				arrRet.push(str.substring(0, index)+end);
			}
		}
		return arrRet;
	}

	static replaceAll(src, s1, s2) {
		return src.replace(new RegExp(s1, "gm"), s2);
	}

	static getSubString(src, head, tail) {
		var indexHead = src.indexOf(head);
		if(indexHead == -1) {
			return "";
		}

		var str = src.substring(indexHead, src.length);
		var indexTail = str.indexOf(tail);
		if (indexTail == -1) {
			return "";
		}

		return src.substring(indexHead, indexTail);
	}
    /*static Trim(str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");

        return result;
    }*/
};

module.exports = { Utils };