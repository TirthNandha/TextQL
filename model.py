import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer


# Load the pre-trained model and tokenizer
model_name = "gpt2-large"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Set the device to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

def generate_sql_from_text(prompt, max_length=100):
    # Tokenize the input text
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)

    # Generate text based on the input
    output = model.generate(input_ids, max_length=max_length, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)

    # Decode the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text
prompt = "write sql query to display the employees whose salary is more than 30000"
generated_sql = generate_sql_from_text(prompt)
print(generated_sql)
