// Blued 解锁隐私相册 (Shadowrocket)
// 直接改写拦截到的用户资料响应，不发额外请求（额外请求缺少 x-bcsign 签名会被拒绝）

let body = $response.body;

try {
  const json = JSON.parse(body);
  if (json && Array.isArray(json.data)) {
    json.data.forEach(item => {
      if (item && typeof item === "object") {
        item.privacy_photos_has_locked = 1;
      }
    });
    body = JSON.stringify(json);
  }
} catch (e) {
  console.log("解锁相册解析失败: " + e);
}

$done({ body });
