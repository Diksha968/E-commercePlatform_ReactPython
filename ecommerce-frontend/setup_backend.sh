#!/bin/bash

# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install required packages
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations users
python manage.py migrate

# Create a superuser (this will prompt for credentials)
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver

