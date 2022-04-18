[![ci](https://github.com/sky2432/routine-nuxt/actions/workflows/ci.yml/badge.svg)](https://github.com/sky2432/routine-nuxt/actions/workflows/cicd.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0311d150-9614-4ea2-b571-23ccee353c19/deploy-status)](https://app.netlify.com/sites/lovely-cascaron-bab7eb/deploys)

# RoutineQuest

ゲーム的要素を取り入れた習慣化アプリケーションです。習慣の登録・習慣達成の記録ができます。連続日数・累計日数・最高連続日数・リカバリー回数の表示とランクアップ機能により習慣化を促します。

![routine-quest](https://user-images.githubusercontent.com/55875685/146111890-367ec7be-8f3f-4900-8476-931c336a9593.png)

## 作成した目的
習慣化のために自身で手作業で行なっていた作業を自動化させるために作成しました。

## アプリケーションURL
https://routine-quest.netlify.app/

トップページの「試してみる」ボタンからアプリを体験してみてください。アプリ体験時は一部機能が制限されています。

## バックエンドリポジトリ
https://github.com/sky2432/routine-laravel

## 機能一覧
- レスポンシブ対応（スマートフォン・タブレット・PC）
- jwtトークン認証
- フォームバリデーション
- ユーザー・習慣のCRUD
- 習慣の達成を記録
- 習慣の連続日数・累計日数・最高連続日数・リカバリー回数の表示
- 習慣のランク機能
- 習慣のアーカイブ
- 習慣達成日をカレンダーで表示
- プロフィール画像の変更
- 獲得ランク数の累計を表示
- 自動テスト・自動デプロイ

## 使用技術
フロントエンド
- HTML/CSS
- TypeScript
- Nuxt.js 2.15.7
- Vuetify 2.5.6
- VeeValidate 3.4.10
- dayjs 1.10.6
- nuxt/axios 5.13.6
- nuxt/auth 5.0.0

バックエンド
- PHP 8.0
- Laravel 8.73.2
- tymon/jwt-auth 1.0
- league/flysystem-aws-s3-v3 1.0.29
- Mysql 8.0.23

インフラ
- Netlify
- Heroku
- github actions

## ER図
![RoutineQuest_ER図](https://user-images.githubusercontent.com/55875685/146117713-e399f523-d88c-40bc-aef1-884706a749fc.png)
