# TTTSever
Tictactoe mobile mutiplay game
sign up, sign in server
본격 모바일 멀티 플레이 틱택토 게임!

# 서버 사용방법

## 회원가입
신규 유저의 등록
### 요청
> {POST} /users/signup

전달값
<pre>
{
 'username':'hongildong',
 'password':'hong1234',
 'name':'홍길동'
}
</pre>

### 결과
#### 성공
<pre>
{
 '_id':'1234567890',
 'username':'hongildong',
 'name':'홍길동'
}
</pre>
#### 실패
{
 'message':'400 Bad Request'
}

##로그인
### 요청

### 결과
