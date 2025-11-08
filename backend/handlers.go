package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var tasks []Task

func init() {
	// Carrega as tarefas do arquivo ao iniciar o servidor
	loaded, err := loadTasks()
	if err == nil {
		tasks = loaded
	}
}

// GET /tasks
func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, tasks)
}

// POST /tasks
func CreateTask(c *gin.Context) {
	var newTask Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido"})
		return
	}

	if newTask.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Título é obrigatório"})
		return
	}

	newTask.ID = getNextID()
	tasks = append(tasks, newTask)
	saveTasks(tasks)
	c.JSON(http.StatusCreated, newTask)
}

// PUT /tasks/:id
func UpdateTask(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var updated Task
	if err := c.ShouldBindJSON(&updated); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido"})
		return
	}

	for i, t := range tasks {
		if t.ID == id {
			updated.ID = id
			tasks[i] = updated
			saveTasks(tasks)
			c.JSON(http.StatusOK, updated)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Tarefa não encontrada"})
}

// DELETE /tasks/:id
func DeleteTask(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	for i, t := range tasks {
		if t.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			saveTasks(tasks)
			c.JSON(http.StatusOK, gin.H{"message": "Tarefa removida com sucesso"})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Tarefa não encontrada"})
}

func getNextID() int {
	maxID := 0
	for _, t := range tasks {
		if t.ID > maxID {
			maxID = t.ID
		}
	}
	return maxID + 1
}
