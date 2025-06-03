# search.py

from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings, DEFAULT_TENANT, DEFAULT_DATABASE
from chromadb import PersistentClient

# Initialize persistent client and embedding model
db_client = PersistentClient(
    path="./chroma_db",
    settings=Settings(),
    tenant=DEFAULT_TENANT,
    database=DEFAULT_DATABASE
)

embed_model = SentenceTransformer("all-MiniLM-L6-v2")

def search(query: str, top_k: int = 1):
    coll = db_client.get_or_create_collection(name="codebase")

    # Sanity check
    docs = coll.get()
    print(f"Collection contains {len(docs['documents'])} chunks.")

    # Embed the query
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
        print(f'\nFile: {meta["path"]} (chunk {meta["chunk_index"]})\n{doc}\n')


if __name__ == "__main__":
    print("Enter your search query (type 'exit' to quit):")
    while True:
        user_input = input("🔍 Search: ").strip()
        if user_input.lower() == "exit":
            print("Exiting search.")
            break
        elif user_input:
            search(user_input)
        else:
            print("Please enter a valid query.")