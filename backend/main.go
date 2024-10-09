package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

	mux "github.com/gorilla/mux"
	env "github.com/joho/godotenv"
	log "github.com/rs/zerolog/log"
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
	log.Info().Msg("sending request message")
	var msg Message
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		log.Warn().Msg("invalid request format")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, chatId := range chatIds {
		if err := sendMessageToTelegram(msg.Text, chatId); err != nil {
			log.Err(err).Msg("unable to send telegram message")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Message sent successfully!"))
}

func main() {
	host := "0.0.0.0:81"
	err := env.Load()
	if err != nil {
		log.Fatal().Msg("Error loading .env file")
	}

	telegramAPI = "https://api.telegram.org/bot" + os.Getenv("TOKEN") + "/sendMessage"
	chatIds = []string{"1292800029", "1213713650"}
	r := mux.NewRouter()
	r.HandleFunc("/api/contact", handlePostMessage).Methods("POST")
	log.Printf("server starting on %s", host)
	http.ListenAndServe(host, r)
}
