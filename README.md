## SNUGG

전공 지식 공유 플랫폼, SNUGG입니다.

* Amplify 배포 주소: https://main.dijisin4nhs5a.amplifyapp.com
* 테스트 배포 주소: http://3.34.132.211

### 배포 - Amplify

Amplify는 main에 push할 때마다 자동으로 배포됩니다 :)

### 배포 - EC2

`yarn deploy` 명령으로 현재 브랜치를 빌드 및 배포할 수 있습니다.

USER, HOST, KEY_FILE 을 정의한 scripts/.env 파일을 추가합니다. 아래는 파일 내용 예시입니다

```shell
USER=ubuntu
HOST=3.34.132.211
KEY_FILE=next-test.pem
```

scripts/$KEY_FILE (위 예에서는 scripts/next-test.pem) 파일도 추가합니다.
파일의 권한은 400으로 설정하여야 합니다. `chmod 400 $KEY_FILE`을 실행하세요.
