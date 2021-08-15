//这个方法是官方给的示例，不推荐在项目中直接用。官方建议使用专业第三方Relay库，而非自己手写
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

function fetchCore(url,time=1500) {
    return new Promise((resolve) => {
        console.log("fetch start...");
        setTimeout(() => {
            console.log("fetch resolve...");
            resolve({
                info:`mockInfo：${url}`
            });
        }, time);
    });
}

export const doFetch = (...params) => wrapPromise(fetchCore(...params));
