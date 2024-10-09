package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

type Message struct {
	Text string `json:"text"`
}

var (
	telegramAPI string
	chatIds     []string
)

func sendMessageToTelegram(message string, chatId string) error {
	msg := Message{Text: message}

	payload, err := json.Marshal(map[string]interface{}{
		"chat_id": chatId,
		"text":    msg.Text,
	})
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", telegramAPI, bytes.NewBuffer(payload))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	_, err = client.Do(req)
	return err
}

func handlePostMessage(w http.ResponseWriter, r *http.Request) {
	var msg Message
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		log.Printf("error handlePostMessage(): %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Printf("call handlePostMessage(): %s", msg.Text)

	for _, chatId := range chatIds {
		if err := sendMessageToTelegram(msg.Text, chatId); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Message sent successfully!"))
}

func main() {
	host := "0.0.0.0:81"
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	telegramAPI = "https://api.telegram.org/bot" + os.Getenv("TOKEN") + "/sendMessage"
	chatIds = []string{"1292800029", "1213713650"}
	r := mux.NewRouter()
	r.HandleFunc("/api/contact", handlePostMessage).Methods("POST")
	log.Printf("server starting on %s", host)
	log.Fatal(http.ListenAndServe(host, r))
}
