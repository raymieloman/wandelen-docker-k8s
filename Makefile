.PHONY: deploy api ui install openport closeport test print_ingress test_ingress teardown

	# If you installed minikube then add this line => kubectl := minikube kubectl --
	# and change below every occurrence of @kubectl to @$(kubectl)
	#
	# Note that the '@' in front of the commands mean that make will not echo the command

#kubectl := minikube kubectl --

#this includes the vars in the Makefile env. Only! needed for that fat_jar target but it is a global setting!
include app/.env
export


all:	install deploy

deploy:
	kubectl apply -f kubernetes/namespace.yaml
	kubectl config set-context --current --namespace=wandelen
	kubectl apply -f kubernetes/mysecret.yaml
	kubectl apply -f kubernetes/myconfigmap.yaml
	kubectl apply -f kubernetes/mysql-pvc.yaml
	kubectl apply -f kubernetes/mysql-deployment.yaml
	kubectl wait --for=condition=ready pod -l app=mysql --timeout=60s
	kubectl apply -f kubernetes/wandelen-api-deployment.yaml
	kubectl apply -f kubernetes/wandelen-ui-deployment.yaml
	kubectl apply -f kubernetes/ingress-wandelen.yaml

install:	api ui
	docker login
	docker image push rloman/wandelen_api:latest
	docker image push rloman/wandelen_ui:latest

ui:
	docker image build -t rloman/wandelen_ui:latest -f app/Dockerfile-ui app

api:
	docker image build -t rloman/wandelen_api:latest -f app/Dockerfile-api app

openport:
	kubectl port-forward service/wandelen 8081:8080 &

closeport:
	killall kubectl

test:
	watch -n 3 curl http://localhost:8081/api/wandelings

test_ingress:
	@$(eval export ingressIP := $(shell kubectl get ingress ingress-wandelen  -o jsonpath='{.status.loadBalancer.ingress[0].ip}'))
#(if you want to print the ingressIP) => 	@echo $(ingressIP)
	@curl -s -o /dev/null -w ' UI test: %{http_code}\n' -H 'Host: wandelen.acme.local' http://$(ingressIP) | sed 's/200/200 => OK/g'
	@curl -s -o /dev/null -w 'API test: %{http_code}\n' -H 'Host: wandelen.acme.local' http://$(ingressIP)/api/wandelen | sed 's/200/200 => OK/g'

print_ingress:
	@echo 'After waiting a minute and when there is an IP-address assigned to the ADDRESS column below ... '
	kubectl get ingress ingress-wandelen
	@echo
	@echo 'Add this to hosts file =>'
	@kubectl get ingress ingress-wandelen | grep -v NAME | sed -E 's/\s+/ /g' | cut --delimiter=' ' -f 3,4 | sed -E 's/([a-z]*\..+).*\s+(.+)/\2\t\1/'

teardown:
	kubectl delete ingress ingress-wandelen --namespace=wandelen
	kubectl delete deployment wandelen-ui --namespace=wandelen
	kubectl delete deployment wandelen --namespace=wandelen
	kubectl delete deployment mysql --namespace=wandelen
	kubectl delete pvc mysql-pv-claim --namespace=wandelen
	kubectl delete secret mysecret --namespace=wandelen
	kubectl delete service wandelen --namespace=wandelen
	kubectl delete service mysql --namespace=wandelen
	kubectl delete namespace wandelen
	kubectl config set-context --current --namespace=default


# some handy tooling
fat_jar:
	mvn clean package -f app/pom.xml
	java -jar app/target/wandelen-*.jar

recreate_configmap:
	kubectl create configmap myconfigmap --from-env-file kubernetes/myconfigmap.properties --namespace=wandelen --dry-run=client -o yaml > kubernetes/myconfigmap.yaml
	
recreate_secret:
	kubectl create secret generic mysecret --from-env-file kubernetes/mysecret.properties --namespace=wandelen --type=Opaque --dry-run=client -o yaml > kubernetes/mysecret.yaml
