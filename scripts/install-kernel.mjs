// 프로젝트 node_modules의 tslab을 .venv Jupyter 커널로 등록하는 스크립트
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const kernelsDir = join('.venv', 'share', 'jupyter', 'kernels');

if (!existsSync('.venv')) {
    console.error('.venv가 없다. 먼저 uv sync를 실행해야 한다.');
    process.exit(1);
}

if (!existsSync(join('node_modules', 'tslab'))) {
    console.error('tslab이 없다. 먼저 npm install을 실행해야 한다.');
    process.exit(1);
}

// 커널 이름별 설정 (노트북 메타데이터의 kernelspec.name과 같아야 한다.)
const kernels = {
    tslab: { displayName: 'TypeScript', language: 'typescript', extraArgs: [] },
    jslab: { displayName: 'JavaScript', language: 'javascript', extraArgs: ['--js'] },
};

for (const [name, { displayName, language, extraArgs }] of Object.entries(kernels)) {
    const dir = join(kernelsDir, name);
    mkdirSync(dir, { recursive: true });

    // node가 노트북 폴더 기준 상대 경로로 프로젝트 tslab을 실행한다.
    const spec = {
        argv: ['node', 'node_modules/tslab/bin/tslab', 'kernel', '--config-path', '{connection_file}', ...extraArgs],
        display_name: displayName,
        language,
    };

    writeFileSync(join(dir, 'kernel.json'), JSON.stringify(spec, null, 4) + '\n');
    console.log(`${displayName} 커널 등록: ${dir}`);
}
