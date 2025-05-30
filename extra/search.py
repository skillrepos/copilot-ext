# search.py

from sentence_transformers import SentenceTransformer

import chromadb
from chromadb.config import Settings, DEFAULT_TENANT, DEFAULT_DATABASE
from chromadb import PersistentClient

# same persistent store and embedding model
db_client = PersistentClient(
    path="./chroma_db",
    settings=Settings(),
    tenant=DEFAULT_TENANT,
    database=DEFAULT_DATABASE
)

embed_model = SentenceTransformer("all-MiniLM-L6-v2")

def search(query: str, top_k: int = 3):
    coll = db_client.get_or_create_collection(name="codebase")

    # sanity check
    docs = coll.get()
    print(f"Collection contains {len(docs['documents'])} chunks.")

    # embed the query in the same vector space
    emb = embed_model.encode(query).tolist()

    results = coll.query(
        query_embeddings=[emb],
        n_results=top_k,
        include=["documents", "metadatas"],
    )

    if not results["documents"][0]:
        print("No matches found.")
        return

    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        print(f'File: {meta["path"]} (chunk {meta["chunk_index"]})\n{doc}\n')

if __name__ == "__main__":
    search("Where is authentication implemented?")