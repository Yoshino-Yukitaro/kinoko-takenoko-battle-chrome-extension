# サクッときのこたけのこ戦争

## 遊び方

1. cloneする

```shell
git clone git@github.com:Yoshino-Yukitaro/kinoko-takenoko-battle-chrome-extension.git
```

2. (既にあれば不要)bunをインストールする

mac:  

```shell
curl -fsSL https://bun.sh/install | bash
```

windows:  

```shell
powershell -c "irm bun.sh/install.ps1 | iex"
```

3. 依存関係をインストール

```shell
bun i
```

4. ビルドする

```shell
bun run build
```

5. Google Chromeの検索欄に`chrome://extensions/`を入力し「パッケージ化されていない拡張機能を読み込む」で先ほどのビルドの成果物`src/dist`を読み込む
