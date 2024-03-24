FROM python:3.10-slim-bullseye

RUN apt update && apt install -y python3-dev default-libmysqlclient-dev build-essential

ENV MYSQLCLIENT_CFLAGS="-I/usr/include/mysql"
ENV MYSQLCLIENT_LDFLAGS="-L/usr/lib/x86_64-linux-gnu -lmysqlclient"

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 3002

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3002", "--reload"]