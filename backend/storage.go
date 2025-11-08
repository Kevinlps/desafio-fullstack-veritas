package main

import (
	"encoding/json"
	"os"
	"sync"
)

var mu sync.Mutex // evita problemas de concorrência

const dataFile = "tasks.json"

func loadTasks() ([]Task, error) {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.Open(dataFile)
	if os.IsNotExist(err) {
		return []Task{}, nil // se o arquivo não existir, retorna lista vazia
	} else if err != nil {
		return nil, err
	}
	defer file.Close()

	var tasks []Task
	if err := json.NewDecoder(file).Decode(&tasks); err != nil {
		return []Task{}, nil // se der erro de parse, começa vazio
	}

	return tasks, nil
}

func saveTasks(tasks []Task) error {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.Create(dataFile)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ") // deixa formatado
	return encoder.Encode(tasks)
}
