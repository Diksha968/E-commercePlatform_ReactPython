@echo off
REM Navigate to the backend directory
cd backend

REM Create a virtual environment
python -m venv venv

REM Activate the virtual environment
call venv\Scripts\activate

REM Install required packages
pip install -r requirements.txt

REM Run migrations
python manage.py makemigrations users
python manage.py migrate

REM Create a superuser (this will prompt for credentials)
python manage.py createsuperuser

REM Start the Django development server
python manage.py runserver

