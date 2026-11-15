# TypeScript

프론트엔드 심화(TypeScript) 과제: 전자상거래 도메인의 데이터 모델링, 타입 가드, 제네릭 저장소를 Jupyter Notebook(tslab 커널)으로 구현합니다.

## 결과물

| 파일 | 내용 |
| --- | --- |
| `01_data_modeling.ipynb` | 문항 1: User·Product 모델링, `filterUsersByRole`, `calculateTotalPrice` |
| `02_generics_typeguard.ipynb` | 문항 2: `in` 연산자 타입 가드 `renderItemSummary`, 제네릭 `InMemoryStorage<T>` |

## 실행 환경 설치

1. VS Code에 **Jupyter** 확장(`ms-toolsai.jupyter`)을 설치합니다.
2. Python과 Jupyter를 준비합니다.

    ```bash
    uv venv
    uv pip install jupyter
    ```

3. tslab을 전역 설치하고 Jupyter 커널로 등록합니다.

    ```bash
    npm install -g tslab
    tslab install --python=python
    ```

4. 커널이 등록됐는지 확인합니다. 목록에 `tslab`, `jslab`이 보이면 됩니다.

    ```bash
    jupyter kernelspec list
    ```

5. VS Code에서 `.ipynb`를 열고 오른쪽 위 **Select Kernel**에서 `TypeScript`(tslab)를 고릅니다.

## 타입 검사 기준

tslab은 `tsconfig.json`을 읽지 않고 자체 컴파일 옵션(strict 꺼짐)으로 셀을 검사합니다. 그래서 노트북에서는 **모든 변수·매개변수·반환값에 타입을 직접 명시**해 `any`가 끼어들 자리를 없애는 방식으로 타입 안정성을 확보합니다. 루트의 `tsconfig.json`(`strict: true`)은 코드가 따라야 할 기준을 적어 둔 파일입니다.

## 트러블슈팅: D 드라이브 등 다른 드라이브에서 기본 타입 오류

프로젝트 폴더와 tslab 설치 위치(전역 npm, 보통 C 드라이브)의 드라이브가 다르면 `'hi'.length`에서도 `Property 'length' does not exist on type 'string'`, `Cannot find name 'console'` 같은 오류가 납니다.

- 원인: tslab의 `forwardTslabPath`(`dist/converter.js`)가 드라이브가 다를 때 `path.relative`가 돌려주는 절대 경로를 상대 경로로 취급해, TypeScript 기본 타입 파일(`lib.*.d.ts`)을 잘못된 위치에서 찾음
- 해결: 전역 tslab의 `dist/converter.js`에서 아래처럼 조건 하나를 추가합니다. (tslab을 재설치하면 다시 적용해야 합니다)

    ```js
    // 변경 전
    if (rel.startsWith("..")) {
    // 변경 후
    if (rel.startsWith("..") || path_1.default.isAbsolute(rel)) {
    ```

- 다른 방법: 프로젝트를 tslab과 같은 드라이브로 옮깁니다.

## 제출

모든 셀을 실행해 출력(Output)을 저장한 뒤, `.venv`를 제외하고 프로젝트 폴더를 `.zip`으로 압축합니다.
