# TypeScript

프론트엔드 심화(TypeScript) 과제: 전자상거래 도메인의 데이터 모델링, 타입 가드, 제네릭 저장소를 Jupyter Notebook(tslab 커널)으로 구현합니다.

## 결과물

| 파일 | 내용 |
| --- | --- |
| `01_data_modeling.ipynb` | 문항 1: User·Product 모델링, `filterUsersByRole`, `calculateTotalPrice` |
| `02_generics_typeguard.ipynb` | 문항 2: `in` 연산자 타입 가드 `renderItemSummary`, 제네릭 `InMemoryStorage<T>` |

## 실행 환경 설치

사전 준비: [uv](https://docs.astral.sh/uv/), Node.js, VS Code

| 구성 | 역할 | 관리 파일 | 설치 위치 |
| --- | --- | --- | --- |
| Jupyter (Python 3.13) | 노트북 실행·출력 저장 | `pyproject.toml`, `uv.lock` | `.venv` |
| tslab (Node.js) | TypeScript 셀 컴파일·실행 | `package.json`, `package-lock.json` | `node_modules` |
| TypeScript 커널 등록 | `.venv`의 Jupyter가 프로젝트 tslab을 쓰도록 연결 | `scripts/install-kernel.mjs` | `.venv/share/jupyter/kernels` |

전역 설치 없이 모든 구성이 프로젝트 폴더 안에 설치됩니다.

1. VS Code에 **Jupyter** 확장(`ms-toolsai.jupyter`)을 설치합니다.
2. 프로젝트 가상환경(`.venv`)을 만들고 Jupyter를 설치합니다.

    ```bash
    uv sync
    ```

3. tslab을 프로젝트에 설치합니다.

    ```bash
    npm install
    ```

4. 프로젝트 tslab을 `.venv`의 TypeScript·JavaScript 커널로 등록합니다.

    ```bash
    npm run kernel:install
    ```

5. 커널이 `.venv` 경로로 보이는지 확인합니다. `tslab`, `jslab`이 `.venv\share\jupyter\kernels` 아래에 있으면 됩니다.

    ```bash
    uv run jupyter kernelspec list
    ```

6. VS Code에서 `.ipynb`를 열고 오른쪽 위 **Select Kernel** → **Jupyter Kernel** → `TypeScript`를 고릅니다. 목록에 `.venv (Python 3.13)`가 먼저 보이더라도 그건 Python 커널이니 고르지 않습니다.

명령줄에서 노트북 전체를 실행해 출력을 저장하려면 다음과 같이 실행합니다. (`--allow-errors`는 의도한 컴파일 에러 셀이 있어도 끝까지 실행하기 위한 옵션입니다)

```bash
uv run jupyter nbconvert --to notebook --execute --inplace --allow-errors --ExecutePreprocessor.kernel_name=tslab 01_data_modeling.ipynb
```

## 타입 검사 기준

tslab은 `tsconfig.json`을 읽지 않고 자체 컴파일 옵션(strict 꺼짐)으로 셀을 검사합니다. 그래서 노트북에서는 **모든 변수·매개변수·반환값에 타입을 직접 명시**해 `any`가 끼어들 자리를 없애는 방식으로 타입 안정성을 확보합니다. 루트의 `tsconfig.json`(`strict: true`)은 코드가 따라야 할 기준을 적어 둔 파일입니다.

## 트러블슈팅: 전역 tslab을 다른 드라이브에서 쓸 때 기본 타입 오류

이 프로젝트는 tslab을 프로젝트 안에 설치하므로 해당하지 않습니다. 전역(`npm install -g tslab`) tslab으로 다른 드라이브(예: D 드라이브)의 노트북을 실행하면 `'hi'.length`에서도 `Property 'length' does not exist on type 'string'`, `Cannot find name 'console'` 같은 오류가 납니다.

- 원인: tslab의 `forwardTslabPath`(`dist/converter.js`)가 드라이브가 다를 때 `path.relative`가 돌려주는 절대 경로를 상대 경로로 취급해, TypeScript 기본 타입 파일(`lib.*.d.ts`)을 잘못된 위치에서 찾음
- 해결: tslab을 노트북과 같은 드라이브에 설치합니다 (이 프로젝트 방식). 전역 tslab을 계속 쓰려면 `dist/converter.js`의 `rel.startsWith("..")` 조건에 `|| path_1.default.isAbsolute(rel)`을 추가합니다.

## 제출

모든 셀을 실행해 출력(Output)을 저장한 뒤, `.venv`를 제외하고 프로젝트 폴더를 `.zip`으로 압축합니다.
