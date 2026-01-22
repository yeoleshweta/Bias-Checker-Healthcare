FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY src/ src/

# Expose the port your Flask/FastAPI app will run on (e.g., 8000 for FastAPI, 5000 for Flask)
EXPOSE 8000

# Command to run the application (will be updated when app.py is created)
# For now, we'll keep it simple
CMD ["echo", "'Container is ready. Run app.py with a web server.'"]