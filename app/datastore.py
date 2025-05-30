class DataStore:
    """In-memory store for to-do items."""
    def __init__(self):
        self._items = {}
        self._next = 1

    def get_all(self):
        return list(self._items.values())

    def create(self, name):
        if not name:
            raise ValueError("Name required")
        item = { "id": self._next, "name": name }
        self._items[self._next] = item
        self._next += 1
        return item

    def update(self, item_id, new_name):
        item = self._items.get(item_id)
        if item is None:
            raise KeyError(f"Item {item_id} not found")
        if new_name:
            item["name"] = new_name
        return item

    def delete(self, item_id):
        if item_id in self._items:
            del self._items[item_id]
        else:
            raise KeyError(f"Item {item_id} not found")