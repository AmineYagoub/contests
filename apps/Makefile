.PHONY: push
push:
	okteto build -t okteto/olympiad-frontend:dev --target dev ./frontend
	okteto build -t okteto/olympiad-frontend ./frontend
	okteto build -t okteto/olympiad-wss:dev --target dev ./wss
	okteto build -t okteto/olympiad-wss ./wss
	okteto build -t okteto/olympiad-contest:dev --target dev ./contest
	okteto build -t okteto/olympiad-contest ./contest
	okteto build -t okteto/olympiad-api:dev --target dev ./gateway
	okteto build -t okteto/olympiad-api ./gateway