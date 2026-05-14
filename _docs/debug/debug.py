
print(vars(self), flush=True)  # インスタンス変数を全部dict形式で出力
print(vars(self.request.user), flush=True)  # インスタンス変数を全部dict形式で出力
print(self.request.user, flush=True)  # インスタンス変数を全部dict形式で出力