FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["sh", "-c", "sed -i 's/listen 80/listen '\"$PORT\"'/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
