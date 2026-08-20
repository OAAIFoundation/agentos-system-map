const colors = {
  kernel: '#b7f36b',
  extension: '#79a8ff',
  contract: '#ffb86b',
  adapter: '#c792ff'
};

const agents = [
  { id: 'agent-a', name: 'Agent Application A', role: 'Research', x: 340, y: 78 },
  { id: 'agent-b', name: 'Agent Application B', role: 'Coding', x: 500, y: 78 },
  { id: 'agent-n', name: 'Agent Application N', role: 'Operations', x: 660, y: 78 }
];

const nodes = [
  {
    id: 'execution', name: 'Execution Loop', code: 'LOOP', kind: 'kernel', x: 245, y: 342,
    summary: '驱动一次 Agent Run 的最小状态机，直到完成、暂停、失败或达到执行边界。',
    duties: ['Turn / Run 生命周期', '动作分派与停止条件', '中断、继续与取消', '错误、超时与重试边界'],
    input: ['用户请求', '当前运行态', '模型或工具结果'], output: ['下一动作', '运行事件', '最终结果'],
    extensions: ['Workflow hooks', 'Checkpoint provider', 'Human approval'],
    standards: ['OpenTelemetry GenAI events'], failure: '循环次数、时间、成本和副作用必须有确定边界。'
  },
  {
    id: 'context', name: 'Context Manager', code: 'CONTEXT', kind: 'kernel', x: 475, y: 245,
    summary: '把消息、状态、记忆、工具定义与产物装配为受预算约束、可追溯的模型输入。',
    duties: ['上下文装配与优先级', 'Token 预算与裁剪', '压缩、摘要与缓存', '来源追踪与上下文隔离'],
    input: ['消息与运行态', '记忆与知识片段', '工具 Schema 与产物'], output: ['模型输入', '上下文快照', '预算与引用记录'],
    extensions: ['Memory provider', 'RAG provider', 'Compaction strategy'],
    standards: ['MCP resources', 'MCP roots'], failure: '上下文溢出、污染和错误来源必须可检测并可回退。'
  },
  {
    id: 'model', name: 'Model Interface', code: 'MODEL IF', kind: 'kernel', x: 745, y: 245,
    summary: '向内核提供稳定推理接口，并把不同模型供应商的能力、流式事件和错误统一起来。',
    duties: ['Provider API 适配', '能力协商与参数归一化', 'Streaming 与错误映射', '切换、熔断与基础回退'],
    input: ['模型输入', '能力要求', '推理配置'], output: ['结构化响应', '工具调用意图', '用量与错误'],
    extensions: ['Routing policy', 'Quota / cost policy', 'Privacy filter'],
    standards: ['Provider APIs', 'OpenTelemetry GenAI spans'], failure: '供应商差异不得泄漏成内核控制流的特殊分支。'
  },
  {
    id: 'tool', name: 'Tool Runtime', code: 'TOOL RT', kind: 'kernel', x: 745, y: 420,
    summary: '管理能力发现到结果回注的完整调用契约，而不是承载具体业务工具。',
    duties: ['Schema 发现与校验', '审批、权限与副作用分级', '并发、超时与幂等', '结果归一化与大结果处理'],
    input: ['工具调用意图', '权限上下文', '工具描述'], output: ['工具结果', '调用事件', 'Artifact 引用'],
    extensions: ['Tool registry', 'Sandbox executor', 'Remote gateway'],
    standards: ['MCP tools', 'Function calling', 'PTC / Code Mode'], failure: '工具失败、部分成功和重试必须与模型推理失败分开表达。'
  },
  {
    id: 'observability', name: 'Observability', code: 'OBSERVE', kind: 'contract', x: 245, y: 505,
    summary: '为内核与扩展定义统一事件、Trace、指标和日志契约，并为评估提供事实数据。',
    duties: ['Run / model / tool tracing', 'Token、延迟与成本指标', '事件关联与责任链', '敏感遥测控制'],
    input: ['全链路事件', '运行指标', '错误与策略结果'], output: ['Trace', 'Metrics / Logs', '评估数据集'],
    extensions: ['OTel exporter', 'Trace storage', 'Online monitor'],
    standards: ['OpenTelemetry', 'GenAI Semantic Conventions'], failure: '遥测失败不能阻断主执行路径，敏感内容默认不应外泄。'
  },
  {
    id: 'security', name: 'Security / Policy', code: 'POLICY', kind: 'contract', x: 500, y: 505,
    summary: '贯穿模型、工具、数据与执行环境的身份、授权、审批和隔离契约。',
    duties: ['Agent 与用户身份', '最小权限与委托边界', '工具审批与策略执行', '密钥、数据和网络隔离'],
    input: ['Principal', '动作与资源', '策略和风险上下文'], output: ['授权决策', '审批请求', '风险事件'],
    extensions: ['Policy engine', 'Identity provider', 'Secrets provider'],
    standards: ['OAuth 2.1', 'MCP authorization'], failure: '默认拒绝高风险副作用，并保留可解释的决策证据。'
  },
  {
    id: 'lifecycle', name: 'Lifecycle / Extensibility', code: 'LIFECYCLE', kind: 'contract', x: 755, y: 505,
    summary: '定义模块发现、能力协商、版本迁移和无损替换，使服务可升级而不破坏内核契约。',
    duties: ['能力发现与协商', '版本和兼容性', '热加载、排空与替换', '健康检查与回滚'],
    input: ['模块描述', '版本约束', '健康与负载状态'], output: ['绑定关系', '迁移计划', '生命周期事件'],
    extensions: ['Plugin registry', 'Deployment controller', 'Feature flags'],
    standards: ['Semantic versioning', 'MCP capability negotiation'], failure: '替换必须先排空有状态 Run，并保持旧版本恢复路径。'
  },
  {
    id: 'memory', name: 'Memory Provider', code: 'MEMORY', kind: 'extension', x: 95, y: 605,
    summary: '提供跨轮次或跨 Session 的长期记忆，不直接控制当前执行循环。',
    duties: ['记忆写入策略', '检索与重排', '合并、衰减与遗忘', '用户和项目隔离'],
    input: ['对话与事件', '检索意图'], output: ['相关记忆', '记忆变更'],
    extensions: ['Vector store', 'Profile store'], standards: ['Provider contract'], failure: '不可用时应降级为无长期记忆运行。'
  },
  {
    id: 'workflow', name: 'Multi-Agent / Workflow', code: 'ORCHESTRATE', kind: 'extension', x: 255, y: 605,
    summary: '组合多个 Agent Kernel 或确定性步骤，提供图式工作流、并发、审批与持久化恢复。',
    duties: ['Graph / DAG 编排', 'Agent handoff 与并发', 'Checkpoint 与恢复', 'Human-in-the-loop'],
    input: ['目标或工作流定义', 'Agent 能力描述'], output: ['子任务', '协作事件', '工作流结果'],
    extensions: ['A2A adapter', 'Checkpoint store'], standards: ['A2A Task / Agent Card'], failure: '部分失败应从检查点恢复，而不是重复全部副作用。'
  },
  {
    id: 'knowledge', name: 'Knowledge / RAG', code: 'KNOWLEDGE', kind: 'extension', x: 415, y: 605,
    summary: '管理可引用的外部知识与检索索引，和基于行为形成的长期记忆保持边界。',
    duties: ['数据接入与索引', '查询改写与混合检索', '重排与引用', '权限过滤与新鲜度'],
    input: ['知识源', '检索问题'], output: ['证据片段', '引用与来源'],
    extensions: ['Search adapter', 'Vector / graph index'], standards: ['MCP resources'], failure: '无证据或低质量证据必须显式返回，不得伪装为模型知识。'
  },
  {
    id: 'workspace', name: 'Workspace / Artifact', code: 'WORKSPACE', kind: 'extension', x: 575, y: 605,
    summary: '提供文件、代码、数据和产物空间，并管理版本、血缘、所有权与生命周期。',
    duties: ['文件与代码操作', 'Artifact 生命周期', '版本和变更集', '协作锁与所有权'],
    input: ['文件操作', '工具输出'], output: ['Artifact 引用', '版本差异'],
    extensions: ['Object store', 'VCS adapter'], standards: ['A2A Artifact', 'MCP roots'], failure: '副作用必须可定位、可审计，并尽可能可回滚。'
  },
  {
    id: 'sandbox', name: 'Sandbox / Code Execution', code: 'SANDBOX', kind: 'extension', x: 735, y: 605,
    summary: '为不可信代码和工具提供可分配、隔离、暂停与恢复的有状态执行环境。',
    duties: ['进程、文件与网络隔离', '资源配额和时限', '预热、休眠与恢复', '稳定执行身份'],
    input: ['执行请求', '环境模板', '权限策略'], output: ['执行结果', 'Artifact', '资源事件'],
    extensions: ['Container / microVM', 'Browser runtime'], standards: ['OCI runtime'], failure: '超限或逃逸风险必须终止环境，而不是仅向模型返回错误文本。'
  },
  {
    id: 'evaluation', name: 'Evaluation / Governance', code: 'EVALUATE', kind: 'extension', x: 895, y: 605,
    summary: '基于运行轨迹评估质量、安全和成本，并形成可审查的改进与治理反馈。',
    duties: ['离线与在线评估', '质量、安全与成本评分', '回归数据集', '策略和配置反馈'],
    input: ['Trace 与结果', '评估规则'], output: ['评估报告', '告警与治理动作'],
    extensions: ['Evaluator', 'Experiment platform'], standards: ['OpenTelemetry traces'], failure: '评估结论应保留版本、样本与证据，避免不可复现的评分。'
  }
];

const providers = [
  { id: 'provider-models', name: 'MODEL APIs', code: 'ADAPTER', kind: 'adapter', x: 175, y: 715, summary: 'OpenAI、Anthropic、Gemini 及兼容模型接口。', standards: ['Provider-native APIs'] },
  { id: 'provider-mcp', name: 'MCP', code: 'STANDARD', kind: 'adapter', x: 340, y: 715, summary: '连接工具、资源与 Prompt 的 Host-Client-Server 协议。', standards: ['MCP'] },
  { id: 'provider-a2a', name: 'A2A', code: 'STANDARD', kind: 'adapter', x: 500, y: 715, summary: '独立 Agent 系统之间的发现、任务与 Artifact 协议。', standards: ['A2A'] },
  { id: 'provider-local', name: 'LOCAL TOOLS', code: 'ADAPTER', kind: 'adapter', x: 660, y: 715, summary: '进程内函数、CLI、SDK 与本地系统能力。', standards: ['JSON Schema'] },
  { id: 'provider-ptc', name: 'PTC / CODE MODE', code: 'EXECUTION MODE', kind: 'adapter', x: 825, y: 715, summary: '让模型通过受控代码组织多次工具调用的执行方式，并非互操作协议。', standards: ['Programmatic Tool Calling'] }
];

const edges = [
  ['execution', 'context', '组装请求'], ['context', 'model', '模型输入'], ['model', 'execution', '响应 / 动作'],
  ['execution', 'tool', '调用意图'], ['tool', 'context', '结果回注'], ['model', 'provider-models', 'Provider API'],
  ['tool', 'provider-mcp', 'MCP'], ['tool', 'provider-local', 'Function / CLI'], ['tool', 'provider-ptc', 'PTC / Code'],
  ['memory', 'context', '长期记忆'], ['knowledge', 'context', '证据 / 引用'], ['workspace', 'context', '文件 / 产物'],
  ['workflow', 'execution', 'Run / handoff'], ['execution', 'workspace', '产物写入'], ['tool', 'sandbox', '隔离执行'],
  ['sandbox', 'workspace', '结果 / 变更'], ['execution', 'observability', 'run events'], ['observability', 'evaluation', '评估数据'],
  ['security', 'tool', '授权 / 审批'], ['security', 'model', '数据策略'], ['lifecycle', 'model', '切换 / 回退'],
  ['lifecycle', 'workflow', '版本 / 恢复'], ['workflow', 'provider-a2a', 'Agent Card / Task'], ['workflow', 'memory', 'checkpoint context']
].map((edge, index) => ({ id: `e${index}`, from: edge[0], to: edge[1], label: edge[2] }));

const flows = [
  { id: 'loop', index: '01', name: '基础执行循环', mode: 'kernel', description: '上下文装配、模型决策与循环控制形成最小可运行内核。', nodes: ['execution', 'context', 'model'], edges: ['e0', 'e1', 'e2'] },
  { id: 'context', index: '02', name: '上下文装配', mode: 'full', description: '记忆、知识与工作空间通过 Context Manager 进入受预算约束的模型输入。', nodes: ['context', 'model', 'memory', 'knowledge', 'workspace'], edges: ['e9', 'e10', 'e11', 'e1'] },
  { id: 'tools', index: '03', name: '受控工具调用', mode: 'full', description: 'Tool Runtime 在策略约束下选择本地、MCP 或代码执行路径，并沉淀产物。', nodes: ['execution', 'tool', 'security', 'sandbox', 'workspace', 'provider-mcp', 'provider-local', 'provider-ptc'], edges: ['e3', 'e6', 'e7', 'e8', 'e14', 'e15', 'e18'] },
  { id: 'models', index: '04', name: '模型适配与替换', mode: 'kernel', description: '稳定的 Model Interface 隔离供应商差异，并支持能力协商、流式响应和替换。', nodes: ['context', 'model', 'lifecycle', 'provider-models'], edges: ['e1', 'e5', 'e20'] },
  { id: 'memory', index: '05', name: '记忆扩展', mode: 'full', description: '长期记忆作为可选 Provider 接入上下文；不可用时内核仍能退化运行。', nodes: ['execution', 'context', 'memory', 'workflow'], edges: ['e0', 'e9', 'e23'] },
  { id: 'multi', index: '06', name: '多 Agent 编排', mode: 'full', description: 'Workflow 服务组合多个独立内核，并通过 A2A Task、Checkpoint 和 handoff 协作。', nodes: ['workflow', 'execution', 'context', 'provider-a2a', 'lifecycle'], edges: ['e12', 'e0', 'e21', 'e22'] }
];

let activeFlow = 'loop';
let selected = 'execution';
let viewMode = 'kernel';
let playing = true;
let timer;

const allItems = [...nodes, ...providers];
const byId = id => allItems.find(item => item.id === id);

function edgeMarkup(edge, activeEdges) {
  const from = byId(edge.from);
  const to = byId(edge.to);
  const midpointX = (from.x + to.x) / 2;
  const midpointY = (from.y + to.y) / 2;
  const involvesExtension = from.kind === 'extension' || to.kind === 'extension';
  const active = activeEdges.has(edge.id);
  return `<line class="edge ${involvesExtension ? 'extension-edge' : ''} ${active ? 'active' : ''}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />
    <text class="edge-label ${involvesExtension ? 'extension-edge' : ''}" x="${midpointX}" y="${midpointY - 7}" text-anchor="middle">${edge.label}</text>`;
}

function renderAgents() {
  document.querySelector('#agentLayer').innerHTML = agents.map(agent => `
    <article class="agent-card" style="left:${agent.x / 10}%;top:${agent.y / 7.6}%">
      <em>AGENT APP</em><strong>${agent.name}</strong><small>${agent.role}</small>
    </article>`).join('');
}

function renderMap() {
  const flow = flows.find(item => item.id === activeFlow);
  const activeEdges = new Set(flow.edges);
  const activeNodes = new Set(flow.nodes);
  const agentActive = ['loop', 'multi'].includes(flow.id);
  const agentLines = agents.map(agent => `
    <line class="agent-edge ${agentActive ? 'active' : ''}" x1="${agent.x}" y1="${agent.y + 28}" x2="245" y2="315" />`).join('');
  document.querySelector('#edgeLayer').innerHTML = agentLines + edges.map(edge => edgeMarkup(edge, activeEdges)).join('');

  document.querySelector('#nodeLayer').innerHTML = nodes.map(node => `
    <button class="system-node ${node.kind} ${selected === node.id ? 'selected' : ''} ${activeNodes.has(node.id) ? 'in-flow' : ''}"
      type="button" data-id="${node.id}" style="left:${node.x / 10}%;top:${node.y / 7.6}%;--node-color:${colors[node.kind]}">
      <em>${node.code}</em><strong>${node.name}</strong><small>${node.kind === 'kernel' ? 'KERNEL MODULE' : node.kind === 'extension' ? 'SYSTEM SERVICE' : 'CROSS-CUTTING'}</small>
    </button>`).join('');

  document.querySelector('#providerLayer').innerHTML = providers.map(provider => `
    <button class="provider-node ${selected === provider.id ? 'selected' : ''} ${activeNodes.has(provider.id) ? 'in-flow' : ''}"
      type="button" data-id="${provider.id}" style="left:${provider.x / 10}%;top:${provider.y / 7.6}%">
      <small>${provider.code}</small><strong>${provider.name}</strong>
    </button>`).join('');

  document.querySelectorAll('[data-id]').forEach(element => element.addEventListener('click', () => {
    selected = element.dataset.id;
    renderMap();
    renderInspector();
  }));
  document.querySelector('#flowIndex').textContent = `FLOW / ${flow.index}`;
}

function renderFlows() {
  document.querySelector('#flowList').innerHTML = flows.map(flow => `
    <button class="flow-button ${flow.id === activeFlow ? 'active' : ''}" type="button" data-flow="${flow.id}">
      <span>${flow.index}</span><div><strong>${flow.name}</strong><small>${flow.description}</small></div>
    </button>`).join('');
  document.querySelectorAll('.flow-button').forEach(element => element.addEventListener('click', () => {
    const flow = flows.find(item => item.id === element.dataset.flow);
    activeFlow = flow.id;
    if (flow.mode === 'full') setViewMode('full');
    playing = false;
    syncPlay();
    renderAll();
  }));
  const flow = flows.find(item => item.id === activeFlow);
  document.querySelector('#flowSummary').innerHTML = `<small>当前场景 / ${flow.mode.toUpperCase()}</small><strong>${flow.name}</strong><p>${flow.description}</p>`;
}

function renderInspector() {
  const node = byId(selected);
  document.querySelector('#inspectorCode').textContent = node.code;
  const kindName = node.kind === 'kernel' ? 'AGENT KERNEL' : node.kind === 'extension' ? 'EXTENSION SERVICE' : node.kind === 'contract' ? 'CROSS-CUTTING CONTRACT' : 'PROVIDER / ADAPTER';
  const duties = node.duties ? `<section class="detail"><h4>RESPONSIBILITIES</h4><ul>${node.duties.map(item => `<li>${item}</li>`).join('')}</ul></section>` : '';
  const io = node.input ? `<section class="detail io"><div><b>INPUT</b>${node.input.map(item => `<span>${item}</span>`).join('')}</div><div><b>OUTPUT</b>${node.output.map(item => `<span>${item}</span>`).join('')}</div></section>` : '';
  const extensions = node.extensions ? `<section class="detail"><h4>EXTENSION POINTS</h4><div class="tag-list">${node.extensions.map(item => `<span>${item}</span>`).join('')}</div></section>` : '';
  const failure = node.failure ? `<section class="detail failure"><h4>FAILURE SEMANTICS</h4><p>${node.failure}</p></section>` : '';
  document.querySelector('#inspectorContent').innerHTML = `
    <div class="inspector-head" style="--node-color:${colors[node.kind]}"><small>${kindName}</small><h3>${node.name}</h3></div>
    <p class="summary">${node.summary}</p>
    ${duties}${io}${extensions}
    <section class="detail"><h4>STANDARDS / CONTRACTS</h4><div class="standards">${(node.standards || []).map(item => `<span>${item}</span>`).join('')}</div></section>
    ${failure}`;
}

function setViewMode(mode) {
  viewMode = mode;
  document.querySelector('#systemMap').classList.toggle('mode-kernel', mode === 'kernel');
  document.querySelector('#systemMap').classList.toggle('mode-full', mode === 'full');
  document.querySelector('#mapModeLabel').textContent = mode === 'kernel' ? 'KERNEL VIEW' : 'FULL SYSTEM VIEW';
  document.querySelectorAll('.view-button').forEach(button => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
}

function syncPlay() {
  const playButton = document.querySelector('#playButton');
  playButton.textContent = playing ? 'Ⅱ' : '▶';
  playButton.setAttribute('aria-label', playing ? '暂停自动播放' : '开始自动播放');
  playButton.setAttribute('title', playing ? '暂停自动播放' : '开始自动播放');
  document.querySelector('#systemMap').classList.toggle('playing', playing);
  clearInterval(timer);
  if (playing) {
    timer = setInterval(() => {
      const index = flows.findIndex(flow => flow.id === activeFlow);
      const nextFlow = flows[(index + 1) % flows.length];
      activeFlow = nextFlow.id;
      setViewMode(nextFlow.mode);
      renderAll();
    }, 6200);
  }
}

function renderAll() {
  renderFlows();
  renderMap();
  renderInspector();
}

document.querySelector('#playButton').addEventListener('click', () => {
  playing = !playing;
  syncPlay();
});

document.querySelector('#labelsButton').addEventListener('click', event => {
  const show = document.querySelector('#systemMap').classList.toggle('show-labels');
  event.currentTarget.textContent = show ? '隐藏连线标签' : '显示连线标签';
});

document.querySelectorAll('.view-button').forEach(button => button.addEventListener('click', () => {
  setViewMode(button.dataset.mode);
  playing = false;
  syncPlay();
}));

document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !/INPUT|TEXTAREA/.test(event.target.tagName)) {
    event.preventDefault();
    playing = !playing;
    syncPlay();
  }
});

renderAgents();
setViewMode(viewMode);
renderAll();
syncPlay();
