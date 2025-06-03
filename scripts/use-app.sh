#!/bin/bash

# Create an item and capture the returned ID
CREATE_RESPONSE=$(curl -s \
  -H "Authorization: Bearer secret-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Buy milk"}' \
  http://127.0.0.1:5000/items)

ITEM_ID=$(echo "$CREATE_RESPONSE" | jq '.id')

echo "Created item with ID: $ITEM_ID"

# List all items
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items

# Update the item
curl -i \
  -X PATCH \
  -H "Authorization: Bearer secret-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Buy almond milk"}' \
  http://127.0.0.1:5000/items/$ITEM_ID

# Search by name (if implemented)
# Replace with correct method/endpoint if needed
curl -i \
  -X GET \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/search?q=milk

# Delete the item
curl -i \
  -X DELETE \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/$ITEM_ID