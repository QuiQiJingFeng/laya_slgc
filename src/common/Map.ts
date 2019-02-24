module util {
    /**
     * Map接口
     */
    export interface Map<K, V> {
        /**
         * 检查是否为空map
         */
        isEmpty(): boolean;

        /**
         * 是否包含key
         */
        containsKey(key: K): boolean;

        /**
         * 根据key获取value
         */
        get(key: K): V;

        /**
         * 添加
         */
        put(key: K, value: V): Map<K, V>;

        /**
         * 删除key
         */
        delete(key: K): boolean;

        /**
         * 清理map
         */
        clear(): void;

        /**
         * 遍历map
         */
        forEach(callbackfn: (key: K, value: V, map?: Map<K, V>) => void);

        /**
         * key的iterator
         */
        keys(): MapIterator<K>;

        /**
         * value的iterator
         */
        values(): MapIterator<V>;

        /**
         * 大小
         */
        size():number;
    }

    /**
     * HashMap
     * key不能是object，否则会出问题
     */
    export class HashMap<K, V> implements Map<K, V>{

        private len: number;
        private obj: Object;// = new Object();

        constructor() {
            this.len = 0;
            this.obj = new Object();
        }

        public isEmpty(): boolean {
            return this.len == 0;
        }

        public containsKey(key: K): boolean {
            return (key as any in this.obj);
        }

        public get(key: K): V {
            return this.containsKey(key)? this.obj[key as any]: null;
        }

        public put(key: K, value: V): Map<K, V> {
            if (!this.containsKey(key)) {
                this.len ++;
            }
            this.obj[key as any] = value;
            return this;
        }

        public delete(key: K): boolean {
            if (this.containsKey(key) && (delete this.obj[key as any])) {
                this.len --;
                return true;
            }
            return false;
        }

        public clear(): void {
            this.len = 0;
            this.obj = new Object();
        }

        public forEach(callbackfn: (key: K, value: V, map?: Map<K, V>) => void) {
            let keys: Array<K> = this.keySet();
            for (let i = 0; i < this.len; i++) {
                let key: K = keys[i];
                callbackfn(key, this.obj[key as any], this);
            }
        }

        private keySet(): K[] {
            let keys: Array<K> = new Array<K>();
            for (var key in this.obj) {
                keys.push(key as any);
            }
            return keys;
        }

        private valueList(): V[] {
            let values: Array<V> = new Array<V>();
            for (let key in this.obj) {
                values.push(this.obj[key])
            }
            return values;
        }

        public keys(): MapIterator<K> {
            return new MapIterator(this.keySet());
        }

        public values(): MapIterator<V> {
            return new MapIterator(this.valueList());
        }

        public size():number{
            return this.len;
        }

    }

    /**
     *  OrderedMap
     */
    export class OrderedMap<K, V> implements Map<K, V> {

        private keyEles: Array<K>;//keys
        private elements: Array<V>;//values


        constructor() {
            this.keyEles = [];
            this.elements = [];
        }

        public isEmpty(): boolean {
            return this.keyEles.length == 0;
        }

        public containsKey(key: K): boolean {
            for(let i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    return true;
                }
            }
            return false;
        }

        public get(key: K): V {
            for (let i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    return this.elements[i];
                }
            }
            return null;
        }

        public put(key: K, value: V): Map<K, V> {
            for (let i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    this.elements[i] = value;
                    return this;
                }
            }
            this.keyEles.push(key);
            this.elements.push(value);
            return this;
        }

        public delete(key: K): boolean {
            for (let i = 0; i < this.keyEles.length; i++) {
                if (this.keyEles[i] == key) {
                    this.keyEles.splice(i, 1);
                    this.elements.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        public clear(): void {
            this.elements = [];
            this.keyEles = [];
        }

        public forEach(callbackfn: (key: K, value: V, map?: Map<K, V>) => void) {
            for (let i = 0; i < this.keyEles.length; i++) {
                callbackfn(this.keyEles[i], this.elements[i], this);
            }
        }

        public keys(): MapIterator<K> {
            return new MapIterator(this.keyEles);
        }

        public values(): MapIterator<V> {
            return new MapIterator(this.elements);
        }

        public size():number{
            return this.keyEles.length;
        }

    }

    export class MapIterator<U>{
        private elements: Array<U>;
        private ps: number;
        constructor(e: Array<U>) {
            this.elements = e;
            this.ps = 0;
        }

        public next(): any {
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
        }

        public dataArray():Array<U>{
            return this.elements;
        }
    }
}