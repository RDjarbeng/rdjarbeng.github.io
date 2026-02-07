import zlib
import base64
import sys

def generate_kroki_url(diagram_type, diagram_source):
    # Compression
    compressed = zlib.compress(diagram_source.encode('utf-8'))
    # Encode
    encoded = base64.urlsafe_b64encode(compressed).decode('utf-8')
    # Kroki URL format
    return f"https://kroki.io/{diagram_type}/svg/{encoded}"

diagram = """graph TD
    A[Start: Web Page] --> B[Add Structured Data]
    B -->|Check Code| C{Rich Results Test}
    C -- Errors --> D[Fix Syntax/Missing Fields]
    D --> B
    C -- Valid --> E[Eligible for Rich Results]
    E --> F[Google Search Index]
    F --> G[End: Enhanced Visual Listing]"""

print(generate_kroki_url("mermaid", diagram), end='')
