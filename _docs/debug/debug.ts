

// resの中身を確認。
console.log({
    status: Res.status,
    statusText: Res.statusText,
    ok: Res.ok,
    headers: Object.fromEntries(Res.headers.entries()),
    body: await Res.text(),
});
