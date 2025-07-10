FROM node:20-bookworm-slim

# Ensure all packages are up-to-date to reduce vulnerabilities
RUN apt-get update && apt-get upgrade -y

ARG TZ
ENV TZ="$TZ"

# Install basic development tools and iptables/ipset
RUN apt update && apt install -y less     git     procps     sudo     fzf     zsh     man-db     unzip     gnupg2     gh     iptables     ipset     iproute2     dnsutils     aggregate     jq     wget     curl  lsof

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \
    chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/node/.gemini && \
    chown -R node:node /workspace /home/node/.gemini

WORKDIR /workspace

RUN ARCH=$(dpkg --print-architecture) && \
    wget "https://github.com/dandavison/delta/releases/download/0.18.2/git-delta_0.18.2_${ARCH}.deb" && \
    sudo dpkg -i "git-delta_0.18.2_${ARCH}.deb" && \
    rm "git-delta_0.18.2_${ARCH}.deb"

# Set up non-root user
USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh


# Install Oh My Zsh
RUN git clone https://github.com/ohmyzsh/ohmyzsh.git /home/node/.oh-my-zsh && \
    chown -R node:node /home/node/.oh-my-zsh && \
    echo "export ZSH=\"/home/node/.oh-my-zsh\"" > /home/node/.zshrc && \
    echo "ZSH_THEME=\"agnoster\"" >> /home/node/.zshrc && \
    echo "source \$ZSH/oh-my-zsh.sh" >> /home/node/.zshrc && \
    chown node:node /home/node/.zshrc


RUN npm install -g @google/gemini-cli
# Copy and set up firewall script
COPY init-firewall.sh /usr/local/bin/
USER root
RUN npx playwright install-deps
#RUN chmod +x /usr/local/bin/init-firewall.sh && \
    #echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && \
    #chmod 0440 /etc/sudoers.d/node-firewall
USER node