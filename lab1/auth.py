# auth.py

def authenticate(user: str, password: str) -> bool:
    """
    Stub for user authentication.
    Replace with real logic (e.g. database lookup, hashing).
    """
    # TODO: implement real authentication
    return user == "admin" and password == "secret"