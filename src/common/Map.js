var util;
(function (util) {
    /**
     * HashMap
     * key不能是object，否则会出问题
     */
    var HashMap = /** @class */ (function () {
        function HashMap() {
            this.len = 0;
            this.obj = new Object();
        }
        HashMap.prototype.isEmpty = function () {
            return this.len == 0;
        };
        HashMap.prototype.containsKey = function (key) {
            return (key in this.obj);
        };
        HashMap.prototype.get = function (key) {
            return this.containsKey(key) ? this.obj[key] : null;
        };
        HashMap.prototype.put = function (key, value) {
            if (!this.containsKey(key)) {
                this.len++;
            }
            this.obj[key] = value;
            return this;
        };
        HashMap.prototype.delete = function (key) {
            if (this.containsKey(key) && (delete this.obj[key])) {
                this.len--;
                return true;
            }
            return false;
        };
        HashMap.prototype.clear = function () {
            this.len = 0;
            this.obj = new Object();
        };
        HashMap.prototype.forEach = function (callbackfn) {
            var keys = this.keySet();
            for (var i = 0; i < this.len; i++) {
                var key = keys[i];
                callbackfn(key, this.obj[key], this);
            }
        };
        HashMap.prototype.keySet = function () {
            var keys = new Array();
            for (var key in this.obj) {
                keys.push(key);
            }
            return keys;
        };
        HashMap.prototype.valueList = function () {
            var values = new Array();
            for (var key in this.obj) {
                values.push(this.obj[key]);
            }
            return values;
        };
        HashMap.prototype.keys = function () {
            return new MapIterator(this.keySet());
        };
        HashMap.prototype.values = function () {
            return new MapIterator(this.valueList());
        };
        HashMap.prototype.size = function () {
            return this.len;
        };
        return HashMap;
    }());
    util.HashMap = HashMap;
    /**
     *  OrderedMap
     */
    var OrderedMap = /** @class */ (function () {
        function OrderedMap() {
            this.keyEles = [];
            this.elements = [];
        }
        OrderedMap.prototype.isEmpty = function () {
            return this.keyEles.length == 0;
        };
        OrderedMap.prototype.containsKey = function (key) {
            for (var i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    return true;
                }
            }
            return false;
        };
        OrderedMap.prototype.get = function (key) {
            for (var i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    return this.elements[i];
                }
            }
            return null;
        };
        OrderedMap.prototype.put = function (key, value) {
            for (var i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    this.elements[i] = value;
                    return this;
                }
            }
            this.keyEles.push(key);
            this.elements.push(value);
            return this;
        };
        OrderedMap.prototype.delete = function (key) {
            for (var i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    this.keyEles.splice(i, 1);
                    this.elements.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        OrderedMap.prototype.clear = function () {
            this.elements = [];
            this.keyEles = [];
        };
        OrderedMap.prototype.forEach = function (callbackfn) {
            for (var i = 0; i < this.keyEles.length; i++) {
                callbackfn(this.keyEles[i], this.elements[i], this);
            }
        };
        OrderedMap.prototype.keys = function () {
            return new MapIterator(this.keyEles);
        };
        OrderedMap.prototype.values = function () {
            return new MapIterator(this.elements);
        };
        OrderedMap.prototype.size = function () {
            return this.keyEles.length;
        };
        return OrderedMap;
    }());
    util.OrderedMap = OrderedMap;
    var MapIterator = /** @class */ (function () {
        function MapIterator(e) {
            this.elements = e;
            this.ps = 0;
        }
        MapIterator.prototype.next = function () {
            if (this.ps >= this.elements.length) {
                return {
                    value: undefined,
                    done: true
                };
            }
            this.ps++;
            return {
                value: this.elements[this.ps - 1],
                done: false
            };
        };
        MapIterator.prototype.dataArray = function () {
            return this.elements;
        };
        return MapIterator;
    }());
    util.MapIterator = MapIterator;
})(util || (util = {}));
//# sourceMappingURL=Map.js.map