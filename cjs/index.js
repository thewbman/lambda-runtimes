// Canonical runtime list: https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
// Array order matters, newest (or most preferable) must always be at the top
// Runtimes still being tested out can be added, just not at runtimes[runtime][0]
let runtimes = {
  node: [
    'nodejs14.x',
    'nodejs12.x',
  ],
  python: [
    'python3.9',
    'python3.8',
    'python3.7',
    'python3.6',
  ],
  ruby: [
    'ruby2.7',
  ],
  java: [
    'java11',
    'java8.al2',
    'java8',
  ],
  go: [
    'go1.x',
  ],
  dotnet: [
    'dotnetcore3.1',
  ],
  custom: [
    'provided.al2',
    'provided',
  ],
}

let runtimeList = Object.values(runtimes).reduce((a, b) => a.concat(b), [])

let runtimesByArchitecture = {
  arm64: [
    ...runtimes.node.slice(0, 2),
    ...runtimes.python.slice(0, 2),
    ...runtimes.ruby.slice(0, 1),
    ...runtimes.java.slice(0, 2),
    ...runtimes.dotnet.slice(0, 1),
    ...runtimes.custom.slice(0, 1),
  ],
  x86_64: [
    ...runtimes.node,
    ...runtimes.python,
    ...runtimes.ruby,
    ...runtimes.java,
    ...runtimes.go,
    ...runtimes.dotnet,
    ...runtimes.custom,
  ],
}

let architecturesByRuntime = {}
Object.values(runtimes).forEach(r => {
  r.forEach(runtime => {
    architecturesByRuntime[runtime] = []
    if (runtimesByArchitecture.arm64.includes(runtime)) {
      architecturesByRuntime[runtime].push('arm64')
    }
    if (runtimesByArchitecture.x86_64.includes(runtime)) {
      architecturesByRuntime[runtime].push('x86_64')
    }
  })
})

let aliases = {
  node:       'node',
  nodejs:     'node',
  'node.js':  'node',
  python:     'python',
  py:         'python',
  ruby:       'ruby',
  rb:         'ruby',
  java:       'java',
  go:         'go',
  golang:     'go',
  dotnet:     'dotnet',
  '.net':     'dotnet',
  custom:     'custom',
}

let retiredRuntimes = {
  node: [
    'nodejs10.x',
    'nodejs8.10',
    'nodejs6.10',
    'nodejs4.3-edge',
    'nodejs4.3',
    'nodejs', // 0.10
  ],
  python: [
    'python2.7',
  ],
  ruby: [
    'ruby2.5',
  ],
  java: [],
  go: [],
  dotnet: [
    'dotnetcore2.1',
    'dotnetcore2.0',
    'dotnetcore1.0',
  ],
  custom: [],
}

module.exports = {
  runtimes,
  runtimeList,
  runtimesByArchitecture,
  architecturesByRuntime,
  aliases,
  retiredRuntimes,
}
