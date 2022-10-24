`Node.js`의 이벤트 루프를 공부하면서 각 페이즈에서 어떤 코드들이 실행되는지 쉽게 확인하기 위해 로깅이 추가된 레포입니다.

`nextTickQueue`, `microTaskQueue`에 대한 로깅은 코드에 대한 이해 부족으로 구현하지 못했습니다.
만약 구현하시면 PR로 올려주시면 이벤트 루프를 공부하는 사람들에게 큰 도움이 될 것 같습니다 :pray:

## Build

```shell
make -j n
```

각자 컴퓨터 환경에 따라서 `n`은 적절하게 설정해서 빌드를 하면 `./node`로 빌드된 `Node`를 실행할 수 있습니다.
make의 j 옵션은 빌드를 할 때 병렬적으로 할당하는 작업의 개수를 말합니다.

```
       -j [jobs], --jobs[=jobs]
            Specifies the number of jobs (commands) to run simultaneously.  If
            there is more than one -j option, the last one is effective.  If the
            -j option is given without an argument, make will not limit the
            number of jobs that can run simultaneously.
```

실행

```shell
./node test.js
```

## 예제

```javascript
setTimeout(() => {
  console.log('setTimeout');
  setImmediate(() => {
    console.log('setImmediate 2');
  });
}, 10);
setImmediate(() => {
  console.log('setImmediate 1');
});
```

만약 위와 같은 코드를 작성하고 빌드된 `Node`로 실행을 하면 아래와 같은 결과가 나옵니다.

```shell
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = -1
Poll Phase[uv__io_pole] Enter
  POP DATA FROM QUEUE
  POP DATA FROM QUEUE
  POLL FOR timeout -1 Start
Timer Phase[uv__run_timers] Enter
  FIND TIMER
  TOO EARLY TO EXECUTE TIMER CALLBACK 10971081432 > 10971081423
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 0
Poll Phase[uv__io_pole] Enter
  POP DATA FROM QUEUE
  POP DATA FROM QUEUE
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
setImmediate 1
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
Timer Phase[uv__run_timers] Enter
  FIND TIMER
  TOO EARLY TO EXECUTE TIMER CALLBACK 10971081432 > 10971081426
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 6
Poll Phase[uv__io_pole] Enter
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Update Timeout 6 -> 6
  POLL FOR timeout 6 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
Timer Phase[uv__run_timers] Enter
  FIND TIMER
  RUN TIMER CALLBACK START
====================
setTimeout
====================
  RUN TIMER CALLBACK END
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 0
Poll Phase[uv__io_pole] Enter
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
setImmediate 2
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 0
Poll Phase[uv__io_pole] Enter
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
UV_RUN_ONCE
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 0
Poll Phase[uv__io_pole] Enter
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
UV_RUN_ONCE
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
  POLL FOR End. polling result : 1
  RUN POLL CALLBACK START
====================
====================
  RUN POLL CALLBACK END
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
Pending Callbacks Phase[uv__run_pending] Enter
Pending Callbacks Phase[uv__run_pending] Exit
Calculated Poll Phase timeout = 0
Poll Phase[uv__io_pole] Enter
  POP DATA FROM QUEUE
  POP DATA FROM QUEUE
  POLL FOR timeout 0 Start
  POLL FOR End. polling result : 0
  There is no completed I/O Request
Poll Phase[uv__io_pole] Exit
Check Phase[uv__run_check] Enter
  RUN CHECK PHASE CALLBACK START
====================
====================
  RUN CHECK PHASE CALLBACK END
Check Phase[uv__run_check] Exit
Close Callbacks Phase[uv__run_closing_handles] Enter
Close Callbacks Phase[uv__run_closing_handles] Exit
UV_RUN_ONCE
Timer Phase[uv__run_timers] Enter
  NO TIMER LEFT
Timer Phase[uv__run_timers] Exit
```
