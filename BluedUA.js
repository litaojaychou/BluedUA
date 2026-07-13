/*
 * Shadowrocket 修改 User-Agent 脚本
 * 适用域名：*.blued.cn, *.irisgw.cn
 */

let headers = $request.headers;

// 1. 寻找 User-Agent 和 ua 请求头字段（忽略大小写）
let uaKey = Object.keys(headers).find(k => k.toLowerCase() === 'user-agent');
let customUaKey = Object.keys(headers).find(k => k.toLowerCase() === 'ua');

// 2. 目标版本号（测试时想改什么数字，直接修改这里的 app/8 即可）
const targetVersion = "app/8";

function modifyUA(origUA) {
    if (!origUA) return origUA;
    // 如果已经包含 app/X，则正则匹配替换
    if (/app\/\d+(\.\d+)*/i.test(origUA)) {
        return origUA.replace(/app\/\d+(\.\d+)*/i, targetVersion);
    }
    // 如果没有，直接追加到末尾
    return origUA + " " + targetVersion;
}

// 3. 执行替换操作
if (uaKey && headers[uaKey]) {
    headers[uaKey] = modifyUA(headers[uaKey]);
}

if (customUaKey && headers[customUaKey]) {
    headers[customUaKey] = modifyUA(headers[customUaKey]);
}

// 4. 返回修改后的请求头
$done({ headers });
