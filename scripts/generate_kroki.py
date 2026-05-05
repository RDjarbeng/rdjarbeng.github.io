import zlib
import base64

def kroki_url(type, text):
    compressed = zlib.compress(text.encode('utf-8'), 9)
    encoded = base64.urlsafe_b64encode(compressed).decode('utf-8')
    return f'https://kroki.io/{type}/svg/{encoded}'

timeline = """timeline
    title 2025 AI Milestones
    January : DeepSeek-R1 Release
            : System 2 Reasoning Era
    February: Claude Code Agent
    April   : US Expanding Sanctions
            : Devin AI 2.0
            : Huawei Yields Double
    August  : OpenAI Reasoning Models
            : US Loosens Chip Ban
    December: Gemini 3 Pro
            : GPT-5.2
            : Nuclear Power Restart"""

chip_war = """graph TD
    A[US Sanctions AI Chips] -->|Restricts H100s| B(China Innovation Gap)
    B -->|Forced Innovation| C{DeepSeek & Huawei}
    C -->|MoE Architectures| D[DeepSeek-R1]
    C -->|Domestic Fab| E[Ascend 910C]
    D & E -->|Performance Match| F[US Panic]
    F -->|Loss of Revenue| G[US Chip Lobbying]
    G -->|Policy Shift| H[Sanctions Loosened]
    H -->|Export Authorized| A"""

with open('kroki_urls.txt', 'w') as f:
    f.write('Timeline URL: ' + kroki_url('mermaid', timeline) + '\n')
    f.write('Chip War URL: ' + kroki_url('mermaid', chip_war) + '\n')
