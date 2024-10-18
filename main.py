from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import hashlib
import os


app = FastAPI()

max_size = 3 * 1024 * 1024  # 3 МБ в байтах
# Директория для хранения загруженных изображений
UPLOAD_DIR = "app/data"
os.makedirs(UPLOAD_DIR, exist_ok=True)
print('Main folder =', UPLOAD_DIR)

# Монтируем статические файлы
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Инициализируем Jinja2Templates для обработки HTML-файлов
templates = Jinja2Templates(directory="app/static/templates")

file_dictionary = {}


# Функция для вставки хедера и футера
def render_template(template_name: str, request: Request, context: dict = {}):
    header = templates.get_template("header.html").render()
    footer = templates.get_template("footer.html").render()
    content = templates.get_template(template_name).render(context)
    return HTMLResponse(header + content + footer)


def get_hex(file_name):
    with open(file_name, 'rb') as f:
        byt = f.read()
    return hashlib.md5(byt).hexdigest()


@app.on_event("startup")
async def startup_event():
    for file_name in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, file_name)
        if os.path.isfile(file_path):
            hex = get_hex(file_path)
            file_dictionary[hex] = file_name
    print('\n=================================')
    print(f'Different files in {UPLOAD_DIR} =', len(file_dictionary))
    print("Приложение запущено!")
    print('=================================\n')
    # Здесь можно выполнить какие-то действия, например, подключение к базе данных


@app.on_event("shutdown")
async def shutdown_event():
    print("Приложение остановлено!")
    # Здесь можно выполнить какие-то действия, например, закрытие соединения с базой данных


# Главная страница
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return render_template("index.html", request)


@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    # Проверка, что файл является изображением
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=401, detail="File is not an image")

    if file.size > max_size:
        raise HTTPException(status_code=413, detail="File size exceeds 3 MB")

    # Вычисляем контрольную сумму загружаемого файла
    file_content = await file.read()
    file_checksum = hashlib.md5(file_content).hexdigest()

    if file_checksum in file_dictionary:
        return {"message": "File with the same content already exists", "filename": file_dictionary[file_checksum]}

    # Проверка на существование файла с таким же именем
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    n = 1
    while os.path.exists(file_path):
        n += 1
        base_name, ext = os.path.splitext(file.filename)
        new_filename = f"{base_name}_{n}{ext}"
        file_path = os.path.join(UPLOAD_DIR, new_filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file_content)
    _, file_name = os.path.split(file_path)
    file_dictionary[file_checksum] = file_name

    if file_name != file.filename:
        return {"message": f"File with this name already exists", "filename": file_name}
    return {"message": f"File uploaded successfully", "filename": file.filename}


@app.get("/download/{filename}")
async def download_image(filename: str):
    # Проверка, существует ли файл
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    # Возвращаем файл как ответ
    return FileResponse(file_path, media_type="image/jpeg")


# Автоматический роутинг для всех HTML-файлов в папке templates
@app.get("/{page_name}", response_class=HTMLResponse)
async def read_page(request: Request, page_name: str):
    template_path = f"{page_name}.html"
    if os.path.exists(f"app/static/templates/{template_path}"):
        return render_template(template_path, request)
    else:
        return HTMLResponse("Page not found", status_code=404)
