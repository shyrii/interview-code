class LRUCache {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.limit) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}

const lruCache = new LRUCache(2);
lruCache.set(1, 1);
lruCache.set(2, 2);
lruCache.set(3, 3);
const res1 = lruCache.get(2);
lruCache.set(4, 4);
const res2 = lruCache.get(2);
console.log(res1, res2);