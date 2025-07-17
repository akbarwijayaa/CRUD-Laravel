# CRUD-Laravel

1. **Clone the repository:**
   ```sh
   git clone https://github.com/akbarwijayaa/CRUD-Laravel.git
   cd CRUD-Laravel
   ```

2. **Install dependencies:**
   Make sure you have Composer installed. Then run:
   ```sh
   composer install && npm i
   ```

3. **Set up the environment:**
   Copy the `.env.example` file to `.env`:
   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run the migrations:**
   Run the following command to set up your database:
   ```sh
   php artisan migrate
   ```

5. **Serve the application:**
   Use Artisan to serve your application:
   ```sh
   composer run dev
   ```
6. **Open App**
    Open http://localhost:8000 to check the app.