FROM golang:1.23 AS builder
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o backend main.go

FROM debian:buster-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /root/
COPY --from=builder /app/backend ./
COPY .env ./
RUN chmod +x ./backend
EXPOSE 4000
CMD ["./backend"]