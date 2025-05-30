# index_code.py

import os
from sentence_transformers import SentenceTransformer
from tiktoken import encoding_for_model

import chromadb
from chromadb.config import Settings, DEFAULT_TENANT, DEFAULT_DATABASE
from chromadb import PersistentClient

# ——— configure a persistent ChromaDB client ———
db_client = PersistentClient(
    path="./chroma_db",             # where the data will be stored
    settings=Settings(),            # default settings
    tenant=DEFAULT_TENANT,          # usually 'default_tenant'
    database=DEFAULT_DATABASE       # usually 'default_database'
)

# use the same embedding model for both indexing and querying
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text: str, max_tokens: int = 500):
    encoder = encoding_for_model("gpt-3.5-turbo")
    tokens = encoder.encode(text)
    for i in range(0, len(tokens), max_tokens):
        yield encoder.decode(tokens[i : i + max_tokens])

def index_directory(directory: str = "."):
    coll = db_client.get_or_create_collection(name="codebase")

    for root, _, files in os.walk(directory):
        for fname in files:
            if not fname.endswith(".py"):
                continue

            path = os.path.join(root, fname)
            with open(path, "r") as f:
                content = f.read()

            for idx, chunk in enumerate(chunk_text(content)):
                # embed locally
                emb = embed_model.encode(chunk).tolist()

                coll.add(
                    ids=[f"{path}-{idx}"],
                    embeddings=[emb],
                    metadatas=[{"path": path, "chunk_index": idx}],
                    documents=[chunk],
                )

    # data is automatically persisted by PersistentClient
    print("Indexing complete — data saved in ./chroma_db")

if __name__ == "__main__":
    index_directory()