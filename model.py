import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load the pre-trained model and tokenizer
model_name = "gpt2-large"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Set the device to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

# Define the schema of the table
table_schema = """
CREATE TABLE Customers (
    CustomerID int,
    FirstName varchar(255),
    LastName varchar(255),
    Age int,
    City varchar(255)
);
"""


def generate_sql_from_text(prompt, max_length=100):
    # Tokenize the input text with table schema as context
    input_text = "Write SQL query for " + prompt
    input_ids = tokenizer.encode(input_text, return_tensors="pt").to(device)

    # Generate text based on the input
    output = model.generate(
        input_ids,
        max_length=max_length,
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id,
    )

    # Decode the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Extract the SQL query from the generated text
    print(generated_text)
    sql_query = generated_text.split("\n\n")[1].strip()
# Decode the generated text


    return sql_query


# Example usage
# prompt = "Find the customers whose age is between 20 and 30."
# generated_sql = generate_sql_from_text(prompt)
# print("Generated SQL query:", generated_sql)
