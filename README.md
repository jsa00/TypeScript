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

루트의 `tsconfig.json`에서 `strict: true`를 켜 두었습니다. tslab은 노트북 폴더의 `tsconfig.json`을 읽기 때문에, 셀에서 암시적 `any`나 `undefined` 가능성을 놓치면 실행할 때 컴파일 오류가 납니다.

## 제출

모든 셀을 실행해 출력(Output)을 저장한 뒤, `.venv`를 제외하고 프로젝트 폴더를 `.zip`으로 압축합니다.
