import config

from loguru import logger
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

def send_message(type: str, name: str, email: str, message: str):
    pass