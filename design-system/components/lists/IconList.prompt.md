Icon list — rows of icon + bold title + description. The "common issues" / feature-list pattern.

```jsx
<IconList items={[
  { icon: "assets/icons/error.png", title: "Permission denied", text: "Run the LED lessons with sudo." },
  { icon: "assets/icons/wifi.png", title: "Can't connect to the Pi", text: "Check the IP and Wi-Fi." },
]} />
```

Items: `{ icon, title, text }`. `iconSize` defaults to 34. Rows divided by hairlines.
