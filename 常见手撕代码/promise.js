class myPromise {
    resolveArr = [];
    rejectArr = [];

    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;

        let change = (status, res) => {
            if (this.status !== 'pending') return;
            this.status = status;
            this.value = res;
            let fnArr = this.status === 'resolved' ? this.resolveArr : this.rejectArr;
            fnArr.forEach(fn => fn(this.value));
        }

        let resolve = (result) => {
            if (this.resolveArr.length) {
                change('resolved', result);
                return;
            }
            setTimeout(() => {
                change('resolved', result);
            }, 0)
        }

        let reject = (err) => {
            if (this.rejectArr.length) {
                change('rejected', err);
                return;
            }
            setTimeout(() => {
                change('rejected', err);
            }, 0)
        }

        executor(resolve, reject);
    }

    then(resolveFn, rejectFn) {
        this.resolveArr.push(resolveFn);
        this.rejectArr.push(rejectFn);
    }
}

const p = new myPromise((resolve, reject) => {
    resolve('result');
    reject('err');
});

p.then(res => console.log(res), err => console.log(err))