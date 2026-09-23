// Blued 解锁隐私相册 (Shadowrocket)
// 出自 Eric 的 Blued增强脚本，仅保留 privacy_photos_has_locked = 1 的逻辑

const match = $request.url.match(/users\/(\d+)\?is_living=false/);

if (!match) {
  $done({});
} else {
  const userId = match[1];
  const original = JSON.parse($response.body);

  const headers = {
    "authority": "argo.blued.cn",
    "accept": "*/*",
    "x-client-color": "light",
    "content-type": "application/json",
    "accept-encoding": "gzip, deflate, br",
    "user-agent": $request.headers["user-agent"] || "",
    "accept-language": "zh-CN",
    "authorization": $request.headers["authorization"] || ""
  };

  $httpClient.get({
    url: `https://argo.blued.cn/users/${userId}/basic`,
    headers: headers
  }, (error, response, data) => {
    if (!error) {
      try {
        const basic = JSON.parse(data);
        const user = basic.data && basic.data[0];
        // 与原脚本一致：basic 中存在 last_operate 和 distance 时才改写
        if (user && user.last_operate !== undefined && user.distance !== undefined
            && Array.isArray(original.data) && original.data.length > 0) {
          original.data[0].privacy_photos_has_locked = 1;
        }
      } catch (e) {
        console.log("basic 解析失败: " + e);
      }
    }
    $done({ body: JSON.stringify(original) });
  });
}
